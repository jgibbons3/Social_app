import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { newPostAction } from "../../../store/action/postAction";
import "./AllPosts.css";
import PostCard from "../../PostCard/PostCard";


const AllPosts = props => {
    let [state, setState] = useState({
        newPost: '',
    })

    const handleNewPost = e => {
        setState({newPost: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        props.dispatch(newPostAction(state.newPost))
        state.newPost =  ""
    }
   
    useEffect(() => {
        
    }, [props.allPosts])
   
    // Search a post
    let filteredPost = props.allPosts.filter((post) => post.content.indexOf(props.filter) !== -1);


    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;
    
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPost.slice(indexOfFirstPost, indexOfLastPost);

    // Pagination
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(props.allPosts.length / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    // Change page
    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    return(
        <div className="all_post_container">
            {/* create new post */}
            <div className='writePostCard'>
                <div>
                    <img className="profile_pic" src={`http://localhost:8000${props.userProfile.image}`} alt="profile_pic"/>
                </div>
                <form className='newPostForm' onSubmit={handleSubmit}>
                    <div>
                        <input className='writePostInput' type='text' name='newPost' value={state.newPost} onChange={handleNewPost} 
                        placeholder='What is on your mind?'></input>
                    </div>
                    <div className='writePostIcon'>
                        <button className='newPostButton' type="submit" style={{cursor: 'pointer'}}>Submit</button>
                    </div>
                </form>
            </div>

            {/* display all posts */}
            <div className="display_post_container" >
                {currentPosts && currentPosts.map((post, i)=> {
                    return <PostCard key={i} post={post}/>
                })}
            </div>

            {/* Pagination */}
            <div className="pagination_container">
                <nav>
                    <ul className="pagination">
                        {pageNumbers && pageNumbers.map(number => (
                            <li key={number} className="page_item">
                                <a onClick={() => handlePagination(number)} href="#" className="page_link">
                                    {currentPage === number ? <div style={{color:"rgb(161, 134, 98)"}}>{number}</div> : 
                                    <div style={{color:"black"}}>{number}</div>}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        userProfile: state.profileReducer.userProfile,
        allPosts: state.postReducer.allPosts,
    }
}

export default connect(mapStateToProps)(AllPosts);