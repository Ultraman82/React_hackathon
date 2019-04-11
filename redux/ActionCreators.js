import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

// Joblist

export const fetchJoblists = () => (dispatch) => {
    
    dispatch(joblistsLoading());

    return fetch(baseUrl + 'joblists')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(joblists => dispatch(addJoblists(joblists)))
    .catch(error => dispatch(joblistsFailed(error.message)));
};

export const joblistsLoading = () => ({
    type: ActionTypes.JOBLISTS_LOADING
});

export const joblistsFailed = (errmess) => ({
    type: ActionTypes.JOBLISTS_FAILED,
    payload: errmess
});

export const addJoblists = (joblists) => ({
    type: ActionTypes.ADD_JOBLISTS,
    payload: joblists
});



export const postFavorite = (dishId)  => (dispatch) => {

    setTimeout(() => {
        dispatch(addFavorite(dishId));
    }, 2000);
};

export const addFavorite = (dishId) => ({
    type: ActionTypes.ADD_FAVORITE,
    payload: dishId
});

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment,    
});

export const postComment = (dishId, author, rating, comment) => (dispatch) => {

    const newFeedback = {
        dishId: dishId,
        author: author,        
        comment: comment,
        rating: rating,
        date: new Date
    };    

    console.log("newFeedback = " + JSON.stringify(newFeedback));
    
    return fetch(baseUrl + 'comments', {
        method: "POST",
        body: JSON.stringify(newFeedback),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {          
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    /* .then(response => dispatch(addComment(response))) */
    .then(response => dispatch(addComment(response)))
    .then(response => {alert(JSON.stringify(response.payload))})
    .catch(error => { console.log('post comment', error.message);
     alert('Your comment could not be posted\nError: ' + error.message);
    });
};


export const deleteFavorite = (dishId) => ({
    type : ActionTypes.DELETE_FAVORITE,
    payload : dishId
})