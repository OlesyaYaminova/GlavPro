import React from 'react';
import {Fab, Rating, TextField} from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {useState} from "react";
import updateReview from "../modules/updateReview";
import deleteReview from "../modules/deleteReview";

const RowReviewContent = ({
  rowContent,
  getDataReviews,
  data,
  setData,
}) => {
  const [editElement, setEditElement] = useState();
  const [editReviewComment, setEditReviewComment] = useState('');
  const [editReviewRate, setEditReviewRate] = useState(0);

  const onUpdateReview = async (id) => {
    const result = await updateReview(id, {
      ...(editReviewRate ? {rate: editReviewRate} : {}),
      ...(editReviewComment ? {comment: editReviewComment} : {})
    });

    if (result.status === 'success') {
      await getDataReviews();
    }
  }

  const onClickEditElement = async id => {
    if (editElement === id) {
      await onUpdateReview(id);

      setEditElement(null);
      setEditReviewComment('');
      setEditReviewRate(0);

      return;
    }

    setEditElement(id);

    const currentElement = data.find(r => r.id === id);

    setEditReviewComment(currentElement.comment);
    setEditReviewRate(currentElement.rate);
  };

  const changeRating = newValue => {
    setEditReviewRate(newValue);
  };

  const onChangeComment = value => {
    setEditReviewComment(value);
  }

  const onDelete = async id => {
    const result = await deleteReview(id);

    if (result.status === 'success') {
      setData(data.filter(a => a.id !== id));
    }
  }

  return (
        <div className="row">
            <span>{rowContent.id}</span>
            {
                editElement !== rowContent.id ? (<span>{rowContent.comment}</span>) :
                    <TextField
                        id="outlined-basic"
                        label="Ваш отзыв"
                        variant="outlined"
                        value={editReviewComment}
                        onChange={event => onChangeComment(event.target.value)}
                    />
            }

            <Rating
                name="half-rating"
                defaultValue={rowContent.rate || editReviewRate}
                precision={1}
                readOnly={editElement !== rowContent.id}
                onChange={(e, value) => changeRating(value)}
            />
            <span>{rowContent.created_at}</span>
            <Fab
                color="circular"
                aria-label="edit"
                onClick={() => onClickEditElement(rowContent.id)}
                size="small"
            >
                {editElement === rowContent.id ? <CheckCircleOutlineOutlinedIcon/> : <EditIcon/>}
            </Fab>
            <Fab
                color="circular"
                aria-label="edit"
                onClick={() => onDelete(rowContent.id)}
                size="small"
            >
                {<DeleteOutlineOutlinedIcon/>}
            </Fab>
        </div>
    )
}

export default React.memo(RowReviewContent);
