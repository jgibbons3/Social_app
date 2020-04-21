import React, { useState } from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import { postAction } from "../../store/action/postAction";
import "./PostsHome.css"
import { FiSearch } from "react-icons/fi"
import { Link, Route, Redirect } from "react-router-dom";
import AllPosts from "./AllPosts/AllPosts";
import LikedPosts from "./LikedPosts/LikedPosts";
import FriendsPosts from "./FriendsPosts/FriendsPosts";
import FollowPosts from "./FollowPosts/FollowPosts";


const PostsHome = props => {
    const PathName = props.location.pathname;

    let [state, setState] = useState({
        search: "",
    });

    const handleSearchPost = e => {
        setState({...state, [e.target.name]: e.target.value})
    };

    const { dispatch } = props;
    useEffect(() => {
        dispatch(postAction())
    }, [dispatch]);

    return(
        <>
        <div>
            <div className='subMenuWrapper'>
                <div className='subMenuLeft'>
                    <div className="seatchIcon">
                        <FiSearch/>
                    </div>
                    <div>
                        <input type='text' name='search' value={state.search} className='searchPostInput' 
                        onChange={handleSearchPost} placeholder='Search posts...'></input>
                    </div>
                </div>
                <div className='subMenuRight'>

                    <Link to="/posts/all_posts" style={{textDecoration: 'none'}}>
                        <p className={PathName.includes('/all_posts') ? 'user_option_clicked' : 'subMenuOptions'}>All</p>
                    </Link>

                    <Link to="/posts/liked_posts" style={{textDecoration: 'none'}}>
                        <p className={PathName.includes('/liked_posts') ? 'user_option_clicked' : 'subMenuOptions'}>Liked</p>
                    </Link>

                    <Link to="/posts/friends_posts" style={{textDecoration: 'none'}}>
                        <p className={PathName.includes('/friends_posts') ? 'user_option_clicked' : 'subMenuOptions'}>Friends</p>
                    </Link>

                    <Link to="/posts/follow_posts" style={{textDecoration: 'none'}}>
                        <p className={PathName.includes('/follow_posts') ? 'user_option_clicked' : 'subMenuOptions'}>Follow</p>
                    </Link>

                </div>
            </div>
        </div>

        <Route path='/posts/all_posts' render={(props) => <AllPosts {...props} filter={state.search} />} />
        <Route exact path='/posts/liked_posts' render={(props) => <LikedPosts {...props} filter={state.search} />} />
        <Route exact path='/posts/friends_posts' render={(props) => <FriendsPosts {...props} filter={state.search} />} />
        <Route exact path='/posts/follow_posts' render={(props) => <FollowPosts {...props} filter={state.search} />} />
        <Redirect from="/posts" to="/posts/all_posts"/>

        </>
    );
};

const mapStateToProps = state => {
    return {
        userProfile: state.profileReducer.userProfile,
        allPosts: state.postReducer.allPosts,
    };
};

export default connect(mapStateToProps)(PostsHome);