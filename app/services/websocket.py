import json

from fastapi import WebSocket, WebSocketDisconnect

from app.api.dependencies import get_current_user
from app.db.repository.message import MessageDAO
from app.services.websocket_manager import manager


class WebsocketService:

    @classmethod
    async def chat_message(cls, chat_id: int, websocket: WebSocket):

        token = websocket.cookies.get("access_token")
        if not token:
            await websocket.close(code=1008)
            return

        user = await get_current_user(token)
        if not user:
            await websocket.close(code=1008)
            return

        await manager.connect(chat_id, websocket)

        try:
            while True:
                data = await websocket.receive_text()
                payload = json.loads(data)
                text = payload["text"]
                message = await MessageDAO.add(chat_id=chat_id, sender_id=user.id, text=text)

                await manager.broadcast(chat_id, {
                    "sender_id": user.id,
                    "text": text
                })

        except WebSocketDisconnect:
            manager.disconnect(chat_id, websocket)


