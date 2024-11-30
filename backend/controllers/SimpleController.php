<?php

namespace backend\controllers;

use app\models\SimpleTable;
use app\models\SimpleSearch;
use Yii;
use yii\base\InvalidConfigException;
use yii\db\Exception;
use yii\filters\ContentNegotiator;
use yii\rest\Serializer;
use yii\web\BadRequestHttpException;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;
use yii\web\Response;

/**
 * SimpleController implements the CRUD actions for SimpleTable model.
 */
class SimpleController extends Controller
{

    public $serializer = Serializer::class;

    public function behaviors(): array
    {

        return array_merge(
            parent::behaviors(),
            [
                'corsFilter'  => [
                    'class' => \yii\filters\Cors::class,
                    'cors'  => [
                        // restrict access to domains:
                        'Access-Control-Allow-Origin'                           => "*",
                        'Access-Control-Request-Method'    => ['POST', 'GET', 'DELETE'],
                        'Access-Control-Allow-Credentials' => true,
                        'Access-Control-Max-Age'           => 3600,
                    ],
                ],
                'contentNegotiator' => [
                    'class' => ContentNegotiator::className(),
                    'formats' => [
                        'application/json' => Response::FORMAT_JSON,
                        'text/html' => Response::FORMAT_JSON,
                    ],
                ],

            ],
        );
    }
    public function afterAction($action, $result)
    {
        $result = parent::afterAction($action, $result);
        return $this->serializeData($result);
    }

    /**
     * @throws InvalidConfigException
     */
    protected function serializeData($data)
    {
        return Yii::createObject($this->serializer)->serialize($data);
    }

    /**
     * @throws BadRequestHttpException
     */
    public function beforeAction($action): bool
    {
        $this->enableCsrfValidation = false;

        return parent::beforeAction($action);
    }

    /**
     * Displays a single SimpleTable model.
     * @param int $id ID
     * @return array|SimpleTable[]
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionView(): array
    {
        return SimpleTable::find()->all();
    }

    /**
     * Creates a new SimpleTable model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return array
     */
    public function actionCreate(): array
    {
        $model = new SimpleTable();

        if ($this->request->isPost) {
            if ($model->load($this->request->post(), '') && $model->save()) {

                $savedModel = $this->findModel($model->id);
                return [
                    'status' => 'success',
                    'data' => $savedModel
                ];
            }
        } else {
            $model->loadDefaultValues();
        }

        return [
            'status' => 'error',
        ];
    }

    /**
     * Updates an existing SimpleTable model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param int $id ID
     * @return string[]
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionUpdate(int $id): array
    {
        $model = $this->findModel($id);

        if ($this->request->isPost && $model->load($this->request->post(), '') && $model->save()) {

           return [
                'status' => 'success',
            ];
        }

        return [
            'status' => 'error',
        ];
    }

    /**
     * Deletes an existing SimpleTable model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param int $id ID
     * @return string[]
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionDelete(int $id): array
    {
        $this->findModel($id)->delete();

        return [
            'status' => 'success',
        ];
    }

    /**
     * Finds the SimpleTable model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param int $id ID
     * @return SimpleTable the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel(int $id): SimpleTable
    {
        if (($model = SimpleTable::findOne(['id' => $id])) !== null) {
            return $model;
        }

        throw new NotFoundHttpException('The requested page does not exist.');
    }
}
