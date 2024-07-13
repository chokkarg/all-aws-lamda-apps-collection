from io import StringIO
import pymysql
import json
import boto3
from datetime import datetime, timedelta
import pandas as pd

# import requests

#config file containing credential for RDS
host = "ao-dai-gia-bach.crke4zwh11p2.ap-northeast-1.rds.amazonaws.com"
username = "root"
password = "Nguoibuongio3k"
db = "ao_dai_gia_bach"

connection = pymysql.connect(host=host, user=username, passwd=password,db=db)
s3 = boto3.client('s3')

def getSQLSatementsByTable(tableName):
    if tableName == "category" or tableName =="customer" or tableName == "product":
        return "SELECT * FROM {}".format(tableName)
    elif tableName == "orders" or tableName == "orderdetail":
        return """SELECT * FROM {} 
        WHERE UpdatedAt BETWEEN CURDATE() - INTERVAL 1 DAY
        AND CURDATE() - INTERVAL 1 SECOND""".format(tableName)
    else: raise Exception("Table is not existing!!!")    

def getFileFolderByTable(tableName):
    lastDayString = (datetime.now() - timedelta(1)).strftime("%Y/%m/%d/")
    return "raw/{}/{}".format(tableName,lastDayString)

def lambda_handler(event,context):
    try:
        listTableName = ["category", "customer", "product", "orders", "orderdetail"]
        
        # Loop for tables
        for tableName in listTableName:
            #Get data
            cursor = connection.cursor()
            sqlStatement = getSQLSatementsByTable(tableName=tableName)
            cursor.execute(sqlStatement)
            rows = cursor.fetchall()


            #Get columns' name as header
            getHeaderStatement = """SELECT group_concat(COLUMN_NAME) 
            FROM INFORMATION_SCHEMA.COLUMNS 
            WHERE TABLE_SCHEMA = '{}' AND TABLE_NAME = '{}';""".format(db, tableName)
            cursor.execute(getHeaderStatement)
            header = cursor.fetchone()[0].split(",")

            bucket = "ao-dai-gia-bach"
            csvFileName = tableName + ".csv"
            fileObject = getFileFolderByTable(tableName=tableName) + csvFileName
            
            #load data to S3
            if(rows):
                df = pd.DataFrame.from_records(rows)
                csv_buffer = StringIO()
                df.to_csv(csv_buffer, index=False, header=header)
                s3.put_object(Body=csv_buffer.getvalue(),Bucket=bucket,Key=fileObject)

        print('put seccessfully!')
    except Exception as exception:
        raise exception
    finally:
        connection.close

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json"
        },
        "body": json.dumps({
            "message": "put seccessfully!"
        })
    }