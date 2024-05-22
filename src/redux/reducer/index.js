import { combineReducers } from 'redux'
import authReducer from './userAuth.reducer'
import profileReducer from './profile.reducer'
import fetchUsersReducers from './allusers.reducer'
import chatReducer from './userChat.reducer'
import conversationReducer from './conversation.reducer'
import usersChatReducer from './usersChat.reducer'
import fetchMessagesReducers from './message.reducer'
import receiverReducer from './receiverInfo'

const rootReducer = combineReducers({
    userAuth: authReducer,
    userProfile: profileReducer,
    usersList: fetchUsersReducers,
    chatUser: chatReducer,
    currentConversation: conversationReducer,
    chats: usersChatReducer,
    allMessages: fetchMessagesReducers,
    chatterInfo: receiverReducer
})
export default rootReducer