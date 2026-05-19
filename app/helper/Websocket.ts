import { Client } from "@stomp/stompjs";
import SockJs from "sockjs-client";

class WebsocektServe{
    private StompClient:Client|null=null;
    private url = "http://192.168.0.117:8088/ws" //connection url
    private subscriptions: {
        topic: string;
        callback: (msg: any) => void;
    }[] = [];
    connect(){
        if(this.StompClient && this.StompClient.connected){
            console.log("Already connected")
            return;
        }
        this.StompClient = new Client({
            webSocketFactory:()=>new SockJs(this.url),
            reconnectDelay: 4000,
            onConnect:()=>{
                console.log("Connected ✅")
                this.subscriptions.forEach(sub=>{
                    this.StompClient?.subscribe(sub.topic,sub.callback)
                })
            },
            onDisconnect:()=>{
                console.log("Disconnected ✅")
            }
        })
        return this.StompClient.activate();
    }
    publish(destination:string,body:any){
        if(this.StompClient && this.StompClient?.connected){
            this.StompClient.publish({
                destination:destination,
                body:JSON.stringify(body)
            })
        }
    }
    subscribe(topic:string,callback: (msg: any) => void){
        //always remeber your subscription no matter what
        this.subscriptions.push({topic,callback})
        if(this.StompClient && this.StompClient?.connected){
            this.StompClient.subscribe(topic,callback)
        }
    }
    disconnect(){
        this.StompClient?.deactivate();
    }
    
}
export default new WebsocektServe()