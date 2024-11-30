<?php

namespace app\models;

/**
 * This is the ActiveQuery class for [[SimpleTable]].
 *
 * @see SimpleTable
 */
class SimpleTableQuery extends \yii\db\ActiveQuery
{
    /*public function active()
    {
        return $this->andWhere('[[status]]=1');
    }*/

    /**
     * {@inheritdoc}
     * @return SimpleTable[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * {@inheritdoc}
     * @return SimpleTable|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }
}
