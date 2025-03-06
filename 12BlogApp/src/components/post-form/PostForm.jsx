import React, {useCallback} from "react";
import { useForm } from "react-hook-form";
import {Button, Input, Select, RTE} from '../index';
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({post}){
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues:{
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        }
    })

    //user either form fill krne ya edit krne aaega
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)
    console.log("userData: ",userData)

    //agar user ne already form submit krdiya ho to )(means ab update krna hai)
    const submit = async(data) =>{
        if(post){
            //upload krege
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]):null

            //but purani image delete bhi to karni padegi
            if(file){
                appwriteService.deleteFile(post.featuredImage);
            }

            //update krege     (!... slug post ka id hai)
            const dbPost = await appwriteService.updatePost(post.$id, {...data, featuredImage : file? file.$id : undefined});
            //so slug dena padta h updatePost wale function ko(check its definition) and bs baaki values spread krdo and sirf ek value change kro (featuredImage wali)

            if (dbPost){
                navigate(`/post/${dbPost.$id}`);
            }

        } //and agar post nahi hai to?
        else{
            // user naya form create krna chahta hai
            const file = await appwriteService.uploadFile(data.image[0]);

            if(file){
                const fileId = file.$id;
                data.featuredImage = fileId;
                console.log(userData.$id)
                const dbPost = await appwriteService.createPost({...data, userId: userData.$id});
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };


    // do field hai humare pass Title and Slug, title ko watch krna hai and slug value generate karni hai
    const slugTransform = useCallback((value)=>{
        if(value && typeof value === 'string'){
            return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g,"-").replace(/\s/g,"-");
        }
        return "";
    }, []);

    //now how to use this above method
    React.useEffect(()=> {
        const subscription = watch((value, {name})=>{
            if(name === 'title'){
                setValue('slug', slugTransform(value.title, {shouldValidate: true}))
            }
        })

        return ()=> {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue]);



    return(
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form> 
    )
}

export default PostForm