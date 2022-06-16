import React, {useState} from 'react'
import axios from 'axios';
import EditPost from './EditPost';

const PostItem = (props) => {

  const [modal, setModal] = useState();

  const editPost = () => {
    setModal(<EditPost upRender={props.rerender} rerender={setModal} original={props.message} id={props.uniqueId}  />)
  }

  const deletePost = () => {
    if(window.confirm("Are you sure you want to delete this post") === true){
    
      let postId = {id: props.uniqueId}

      axios.post('http://localhost:8888/api/deletePost.php', postId)
      .then((res)=>{
        let data = res.data;
        console.log(data); 
        props.rerender(true);
      });
      
    } else {
      console.log("The user did not delete the post");
    }
  }

  return (
    <div>
     {modal}
      <div id={props.uniqueId} className='post_item'>
        <div className='postHeader'>
          <h3 className='userPost'>{props.userpost}</h3>
          <h6 className='date'>{props.date}</h6>
        </div>
          <p className="mess">{props.message}</p>
          <div className='postUi'>
            <p className='edit' onClick={editPost}>Edit Post</p>
            <p className='delete' onClick={deletePost}>Delete Post</p>
          </div>
          
      </div>
      
    </div>
  )
}

export default PostItem
