<?php

namespace app\models;

/**
 * This is the model class for table "simpleTable".
 *
 * @property int $id
 * @property string $comment
 * @property string|null $created_at
 * @property int $rate
 */
class SimpleTable extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'simpleTable';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['comment', 'rate'], 'required'],
            [['created_at'], 'safe'],
            [['rate'], 'integer'],
            [['comment'], 'string', 'max' => 255],
        ];
    }

    public function fields()
    {
        return array_keys(self::attributeLabels());
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'comment' => 'Comment',
            'created_at' => 'Created At',
            'rate' => 'Rate',
        ];
    }

    /**
     * {@inheritdoc}
     * @return SimpleTableQuery the active query used by this AR class.
     */
    public static function find()
    {
        return new SimpleTableQuery(get_called_class());
    }
}
