import {Meets,Friends} from "../modules/SocketModule";

export const sendFriendRequest = (requester,responser,type,msg) => {
    Friends(JSON.stringify({
        requester:requester,
        responser:responser,
        type:type,
        msg:msg
    }));
};

export const acceptFriendRequest = (requester, responser) => {
    Friends(JSON.stringify({
        requester:requester,
        responser:responser,
        type:1,
        msg:''
    }));
};


//    //type = 1 为创建
//     //type = 2 为加入
//     //type = -1 为退出
//      //type = -2 创建者移除用户

export const createMeet = (uid,meetId) => {
    Meets({
        uid:uid,
        meetId:meetId,
        type:1
    });
};

export const joinMeet = (uid,meetId) => {
    Meets({
        uid:uid,
        meetId:meetId,
        type:2
    });
};

//删除自己
export const quitMeet = (uid,meetId) => {
    Meets({
        uid:uid,
        meetId:meetId,
        type:-1
    });
};

//删除某人
export const RemoveFromMeet = (uid,meetId) => {
    Meets({
        uid:uid,
        meetId:meetId,
        type:-2
    });
};


//删除活动
export const dismissMeet = (uid,meetId) => {
    Meets({
        uid:uid,
        meetId:meetId,
        type:3
    });
};