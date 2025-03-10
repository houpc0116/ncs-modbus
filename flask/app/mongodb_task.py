import pymongo, os
from bson.json_util import dumps
from bson.objectid import ObjectId
class MongoDB_Task():
    def __init__(self):
        #self.mongo_host = "mongodb://localhost"
        self.mongo_host = os.environ.get('MONGO_HOST')
        self.mongo_port = int(os.environ.get('MONGO_PORT'))
        self.mongo_username = os.environ.get('MONGO_USERNAME')
        self.mongo_password = os.environ.get('MONGO_PASSWORD')

        self.mongo_db = os.environ.get('MONGO_DB')

        self.myclient = pymongo.MongoClient(
            host=self.mongo_host,
            port=self.mongo_port,
            username=self.mongo_username,
            password=self.mongo_password,
        ) 
        self.mydb = self.myclient[self.mongo_db]


    def getDB(self,Collections):
        return self.mydb[Collections]

    def getSerialPorts(self):
        mydoc = self.mydb["serial_ports"].find({},{'_id':0}).sort({'port':1})
        return list(mydoc)

    def setSerialPorts(self, port, baudrate, parity, stopbits, bytesize, timeout):
        self.mydb["serial_ports"].update_one( {"port": port} , {"$set":  { "baudrate": int(baudrate), "parity": parity, "stopbits":int(stopbits), "bytesize":int(bytesize), "timeout":timeout }} )

    def getDevice(self,port):
        mydoc = self.mydb["devices2"].find({'port':port},{'_id':0}).sort({'interval':-1})
        return list(mydoc)

    def getDeviceList(self,portid):
        mydoc = self.mydb["devices2"].find({'port':portid},{'_id':1,'device_name':1,'port':1,'device_id':1,'pullTimeMS':1,'status':1}).sort({'port':1})
        devicelist = []
        for dev in list(mydoc):
            devicelist.append( { '_id':str( ObjectId(dev['_id']) ), 'device_name':dev['device_name'], 'port':dev['port'], 'device_id':dev['device_id'], 'pullTimeMS':dev['pullTimeMS'], 'status':dev['status'] } )
        return devicelist

    def updateDevice(self,db_id,addr,pulltime,querydelay,delayMsBeforeQuery):
        # print(f"db_id={db_id} addr={addr} pulltime={pulltime} querydelay={querydelay} delayMsBeforeQuery={delayMsBeforeQuery}")
        reg = {'device_id':addr, 'pullTimeMS':pulltime, 'queryDelay':querydelay, 'delayMsBeforeQuery':delayMsBeforeQuery }
        self.mydb["devices2"].update_one( {'_id': ObjectId(db_id) }, { '$set': reg } )
        return (f"update successfully.")

    def delDevices(self,db_id,):
        result = self.mydb["devices2"].delete_one({'_id':ObjectId(db_id)})
        return (f"deleted successfully.")

    
    def addDevices(self,port,id,name,pullTimeMS,delayMsBeforeQuery,queryDelay):
        insert_data = { 
            'port': int(port), 
            'device_id':int(id), 
            'device_name':str(name), 
            'pullTimeMS':int(pullTimeMS), 
            'delayMsBeforeQuery':int(delayMsBeforeQuery), 
            'queryDelay':int(queryDelay), 'list':[],
            'status': False
        }
        result = self.mydb["devices2"].insert_one(insert_data)
        # print(f"add device result = {result}")
        if result.acknowledged:
            return (f"Add Device {name} successfully")
        else:
            return (f"Add {name} failed!")

    def addReg(self,db_id,name,fun,start,count,regtype,endial,scale,floatpoint):
        reg = {'name':name, 'start':int(start), 'fun':int(fun), 'count':int(count), 'type':regtype, 'endial':endial, 'scale':float(scale), 'decimal':int(floatpoint)}
        result = self.mydb["devices2"].update_one({"_id": ObjectId(db_id)},{"$push": {"list": {"$each": [reg]}}})
        if result.modified_count > 0:
            return (f"Add Register {name} successfully")
        else:
            return (f"Add {name} failed!")

    def updReg(self,db_id,name,fun,start,count,regtype,endial,scale,floatpoint,index):
        reg = {'name':name, 'start':int(start), 'fun':int(fun), 'count':int(count), 'type':regtype, 'endial':endial, 'scale':float(scale), 'decimal':int(floatpoint)}
        print(f"reg={reg} index={index}")
        update_index = "list."+str(index)
        result = self.mydb["devices2"].update_one( {"_id": ObjectId(db_id)}, {"$set": {update_index: reg}} )
        if result.modified_count > 0:
            return (f"update Register {name} successfully")
        else:
            return (f"update {name} failed!")

    def delReg(self,db_id,index):
        print(f"db_id={db_id} list.index = {index}")
        self.mydb["devices2"].update_one( {"_id": ObjectId(db_id)}, {f"$unset": {f"list.{index}": 1}} )
        result = self.mydb["devices2"].update_one( {"_id": ObjectId(db_id)}, {"$pull": {"list": None}} )
        if result.modified_count > 0:
            return (f"Del Register successfully")
        else:
            return (f"Del failed!")

    def getRegList(self,db_id):
        mydoc = self.mydb["devices2"].find_one({'_id':ObjectId(db_id)})
        # print(f"mydoc={mydoc['list']}")
        return mydoc['list']

    def getDeviceInfo(self,db_id):
        mycol = self.mydb["devices2"].find({'_id':ObjectId(db_id)},{'_id':0})
        return mycol[0]

    def getMqtt(self):
        mydoc = self.mydb["mqtt_config"].find({},{'_id':0})
        return list(mydoc)

    def setMqtt(self, broker, port, config_id, username, password, topic, interval, keepalive):
        self.mydb["mqtt_config"].update_one( {}, {"$set":{"broker":broker, "port":int(port), "config_id":config_id, "username":username, "password":password, "keepalive":int(keepalive), "topic_prefix":topic, "interval":int(interval) }} )
