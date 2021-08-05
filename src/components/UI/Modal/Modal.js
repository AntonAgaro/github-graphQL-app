import React, {useState} from 'react';
import pushComment from '../../../utils/pushComment';
import Spinner from '../Spinner/Spinner';
import './Modal.scss';

const Modal = ({active, setModalActive, choosenIssue, token}) => {
  const [commentText, setCommentText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pushedComment, setPushedComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const classesModal = ['modal'];
  const classesModalContent = ['modal-content']
  if (active) {
    classesModal.push('modal--active');
    classesModalContent.push('modal-content--active');
  }

  const handleCommentTextChange = e => {
    setCommentText(e.target.value);
  }

  const leaveComment = (e) => {
    e.preventDefault();
    setIsLoading(true)
    pushComment(choosenIssue.id, commentText, token)
      .then(res => {
        if (!res.data) {
          throw new Error('Error! Check entering data and try again.')
        }
        setCommentText('');
        setIsLoading(false);
        setPushedComment(res.data.addComment.commentEdge.node.body);
        setTimeout(() => {
          setPushedComment('');
          setModalActive(false);
        }, 3000);
      })
      .catch(e => {
        setCommentText('');
        setErrorMessage('Error! Check entering data and try again.');
        setIsLoading(false);
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      }); 
  }

  const renderPushCommentMessage = () => {
    if (pushedComment) {
      return (
        <h3 style={{textAlign: "center"}}>
          Your commentary "{pushedComment}" was successfully pushed!
        </h3>
      )
    } else if (errorMessage) {
      return (
        <h3 style={{textAlign: "center"}}>
          {errorMessage}
        </h3>
      )
    }
  }

  const renderForm = () => {
    if (!pushedComment && !errorMessage) {
      return (
        isLoading ? 
        <Spinner 
          classes="lds-spinner lds-spinner--active"
          wrapperClass="spinner-modal"  
          /> :
        <form className="modal-content__form" onSubmit={leaveComment}>
        <textarea 
          className="modal-content__textarea" 
          cols="30" 
          rows="10"
          onChange={handleCommentTextChange}
          value={commentText}
        />
        <button 
          className="modal-content__btn">Comment</button>
      </form>
      )
    }
  }

  return (
    <div 
      className={classesModal.join(' ')}
      onClick={() => setModalActive(false)}
    >
      <div 
      className={classesModalContent.join(' ')}
      onClick={e => e.stopPropagation()}
      >
        <div className="modal-content__title">Issue: {choosenIssue.title}</div>
        {renderPushCommentMessage()}
        {renderForm()}
      </div>
    </div>
  )
}


export default Modal;