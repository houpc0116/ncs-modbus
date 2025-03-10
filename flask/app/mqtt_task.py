
import paho.mqtt.client as mqtt
import threading
import time

class MQTTClient():
    def __init__(self, DB):
        self.db = DB

        self.mqtt_config = self.db.getMqtt()[0]

        self.client = mqtt.Client()
        self.client.on_connect = self.on_connect
        self.client.on_disconnect = self.on_disconnect

        self.thread  = None
        self.running = False
        # print(f"regWrite={str(self.mqtt_config['topic_prefix'])}/write")
        

    def on_connect(self, client, userdata, flags, rc):
        if rc == 0:
            print("Connected successfully!")
            self.client.subscribe("MQTTGO-6585662874/#")
            # self.client.subscribe(str(self.mqtt_config['topic_prefix'])+"/write")
        else:
            print(f"Connection failed with code {rc}")

    def on_disconnect(self, client, userdata, rc, properties=None):
        print(f"Disconnected with result code {rc}")

    def on_interval(self):
        pass

    def run(self):
        # print("Mqtt Start")
        time.sleep(2)
        self.running = True
        self.mqtt_config = self.db.getMqtt()[0]
        self.mqtt_config['broker'] = "broker.hivemq.com"  # (TEST)
        self.mqtt_config['port'] = 8000  # (TEST)
        self.mqtt_config['keepalive'] = 60  # (TEST)
        self.mqtt_config['interval'] = 5  # (TEST)

        self.client.connect( self.mqtt_config['broker'], int(self.mqtt_config['port']) , int(self.mqtt_config['keepalive']) )
        start_time = time.time()

        while self.running:
            self.client.loop(timeout=1.0)
            current_time = time.time()
            if current_time - start_time >= self.mqtt_config['interval']:
                # print(f"mqtt interval { round(current_time - start_time,0) }S")
                self.on_interval()
                start_time = time.time()

    def start(self):
        self.thread = threading.Thread(target=self.run)
        self.thread.start()

    def stop(self):
        self.client.disconnect()
        tmpthread = threading.Thread(target=self.waitThread)
        tmpthread.start()

    def waitThread(self):
        self.running = False
        self.thread.join()
        self._onMqttThreadEnd()

    def send_device(self,data):
        if self.client.is_connected:
            self.mqtt_config['topic_prefix'] = "MQTTGO-6585662874"
            topic = self.mqtt_config['topic_prefix']
            # print(f"send topic = {topic}")
            self.client.publish( topic , str(data))

    def _onMqttThreadEnd(self):
        pass