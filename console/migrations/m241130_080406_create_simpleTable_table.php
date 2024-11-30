<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%simpleTable}}`.
 */
class m241130_080406_create_simpleTable_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%simpleTable}}', [
            'id' => $this->primaryKey(),
            'comment' => $this->string()->notNull(),
            'created_at' => $this->dateTime()->defaultValue(date('Y-m-d H:i:s')),
            'rate' => $this->smallInteger()->notNull(),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%simpleTable}}');
    }
}
