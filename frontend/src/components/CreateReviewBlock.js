import React, { useState, useCallback } from "react";
// MUI
import Button from '@mui/material/Button';
import {Rating, TextField} from "@mui/material";
// Modules
import createReview from "../modules/createReview";

import '../App.css';

const CreateReviewBlock = ({ setData }) => {
  // State
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRate, setNewReviewRate] = useState(0);

  // Handler
  const onCreateReview = useCallback(async () => {
    const result = await createReview({
      ...(newReviewRate ? {rate: newReviewRate} : {}),
      ...(newReviewComment ? {comment: newReviewComment} : {}),
    });

    if (result.status === 'success') {
      setNewReviewRate(0);
      setNewReviewComment('');

      setData(prevState => {
        return [...prevState, result.data];
      })
    }
  }, [
    newReviewRate,
    newReviewComment,
    setData,
  ])

  // Render
  return (
    <div className="content">
      <Rating
        name="half-rating"
        defaultValue={0}
        precision={1}
        value={newReviewRate}
        size="large"
        onChange={(e, value) => {
          setNewReviewRate(value)
        }}
      />
      <TextField
        fullWidth
        id="outlined-basic"
        label="Ваш отзыв"
        variant="outlined"
        value={newReviewComment}
        onChange={event => {
          setNewReviewComment(event.target.value)
        }}
      />
      <Button
        variant="contained"
        onClick={onCreateReview}
        disabled={!newReviewComment || !newReviewRate}
      >
        Добавить отзыв
      </Button>
    </div>

  );
}

export default React.memo(CreateReviewBlock);
