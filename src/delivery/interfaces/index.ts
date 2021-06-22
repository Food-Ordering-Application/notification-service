enum EDeliverEvent {
  driverDispatched = 0,
  driverMoving,
}

interface OrderLocationUpdateEventPayload {
  orderId: string;
  driverId: string;
  latitude: number;
  longitude: number;
}

export { EDeliverEvent, OrderLocationUpdateEventPayload };
