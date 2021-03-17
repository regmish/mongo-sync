from pymongo import errors, MongoClient
# from bson.json_util import dumps
import os, sys

DB_URI = os.getenv('DB_URI') or 'mongodb://localhost:27020'


def watch_changes(db_client, collections):
    print(f'Watching changes for {collections}')
    user_changes = db_client.sync[collections].watch()

    for change in user_changes:
        print(change)


if __name__ == '__main__':
    with MongoClient(DB_URI) as client:
        try:
            client.admin.command('replSetGetStatus')
            watch_changes(db_client=client, collections='users')
        except errors.OperationFailure as e:
            print('MongoDB not running in Replication')
