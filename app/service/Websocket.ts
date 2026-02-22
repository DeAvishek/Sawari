import { Client } from "@stomp/stompjs";
import SockJs from "sockjs-client";

class WebsocektServe{
    private Stopmpclient:Client|null=null;
    private url = "http://192.168.0.117:8088/trip"
    private subscriptions: {
        topic: string;
        callback: (msg: any) => void;
    }[] = [];
    connect(){
        if(this.Stopmpclient && this.Stopmpclient.connected){
            console.log("Already connected")
            return;
        }
        this.Stopmpclient = new Client({
            webSocketFactory:()=>new SockJs(this.url),
            reconnectDelay: 4000,
            onConnect:()=>{
                console.log("Connected ✅")
                this.subscriptions.forEach(sub=>{
                    this.Stopmpclient?.subscribe(sub.topic,sub.callback)
                })
            },
            onDisconnect:()=>{
                console.log("Disconnected ✅")
            }
        })
        return this.Stopmpclient.activate();
    }
    publish(destination:string,body:any){
        if(this.Stopmpclient && this.Stopmpclient?.connected){
            this.Stopmpclient.publish({
                destination:destination,
                body:JSON.stringify(body)
            })
        }
    }
    subscribe(topic:string,callback: (msg: any) => void){
        //always remeber your subscription no matter what
        this.subscriptions.push({topic,callback})
        if(this.Stopmpclient && this.Stopmpclient?.connected){
            this.Stopmpclient.subscribe(topic,callback)
        }
    }
    disconnect(){
        this.Stopmpclient?.deactivate();
    }
    
}
export default new WebsocektServe()