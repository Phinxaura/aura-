import { useSelector } from "react-redux"
import CreatePost from "./CreatePost"
import Tweet from "./Tweet"

const Feed = () => {
  const {tweets} = useSelector((state : any)=>state.tweet);
  return (
    <div className="w-[50%] border border-gray-200">
      <CreatePost/>
      {/* <Tweet/>
      <Tweet/>
      <Tweet/>
      <Tweet/>
      <Tweet/>
      <Tweet/>
      <Tweet/>
      <Tweet/>
      <Tweet/> */}
      {
    tweets?.map((tweet : any)=>{
     return(
      <Tweet key={tweet?._id} tweet = {tweet}/>
     ) 
    })


      }
    </div>
  )
}

export default Feed
