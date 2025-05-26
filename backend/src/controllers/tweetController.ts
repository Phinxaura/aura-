import { Tweet } from "../models/tweetSchema";
import { User } from "../models/userSchema";



//create tweet
export const createTweet = async (req : any, res : any) => {
    try {
        const { description, id } = req.body;
        if (!description || !id) {
            return res.status(401).json({
                message: "Fields are required.",
                success: false
            });
        };
        const user = await User.findById(id).select("-password");
        await Tweet.create({
            description,
            userId:id,
            userDetails:user
        });
        return res.status(201).json({
            message:"Tweet created successfully.",
            success:true,
        })
    } catch (error) {
        console.log(error);
    }
}

//delete tweet
export const deleteTweet = async (req:any,res:any) => {
    try {
        const {id}  = req.params;
        await Tweet.findByIdAndDelete(id);
        return res.status(200).json({
            message:"Tweet deleted successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

//like or dislike
export const likeOrDislike = async (req:any,res:any) => {
    try {
        const loggedInUserId = req.body.id;
        const tweetId = req.params.id;
        const tweet : any = await Tweet.findById(tweetId);
        if(tweet.like.includes(loggedInUserId)){
            // dislike
            await Tweet.findByIdAndUpdate(tweetId,{$pull:{like:loggedInUserId}});
            return res.status(200).json({
                message:"User disliked your tweet."
            })
        }else{
            // like
            await Tweet.findByIdAndUpdate(tweetId, {$push:{like:loggedInUserId}});
            return res.status(200).json({
                message:"User liked your tweet."
            })
        }
    } catch (error) {
        console.log(error);
    }
};

//getalltweets
export const getAllTweets = async (req : any,res : any) => {
    // loggedInUser ka tweet + following user tweet
    try {
        const id = req.params.id;
        const loggedInUser : any= await User.findById(id);
        const loggedInUserTweets : any= await Tweet.find({userId:id});
        const followingUserTweet : any= await Promise.all(loggedInUser.following.map((otherUsersId : any)=>{
            return Tweet.find({userId:otherUsersId});
        }));
        return res.status(200).json({
            tweets:loggedInUserTweets.concat(...followingUserTweet),
        })
    } catch (error) {
        console.log(error);
    }
}

//getfollowingtweets
export const getFollowingTweets = async (req : any ,res : any ) =>{ 
    try {
        const id = req.params.id;
        const loggedInUser : any = await User.findById(id); 
        const followingUserTweet : any = await Promise.all(loggedInUser.following.map((otherUsersId : any )=>{
            return Tweet.find({userId:otherUsersId});
        }));
        return res.status(200).json({
            tweets:[].concat(...followingUserTweet)
        });
    } catch (error) {
        console.log(error);
    }
}
