const RideStatus = {
  REQUESTED: "REQUESTED",
  ACCEPTED: "ACCEPTED",
  PICKED_UP: "PICKED_UP",
  IN_TRANSIT: "IN_TRANSIT",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

export type RideStatus = (typeof RideStatus)[keyof typeof RideStatus];
export interface IPickupAndDropoffLocation {
  address: string;
  latitude?: string;
  longitude?: string;
  boundingbox?: string[];
}

export interface IRide {
  _id?: string;
  rider: string;
  driver?: string;
  pickupLocation: IPickupAndDropoffLocation;
  dropoffLocation: IPickupAndDropoffLocation;
  status: RideStatus;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
  otp?: number;
  fee: number;
  isRideOTPVerified?: boolean;
  isRideAccepted?: boolean;
  isPaid?: boolean;
}

export interface IRideHistory {
  isDeleted?: boolean;
  _id?: string;
  rideId: string;
  updatedBy?: string;
  isPaid?: boolean;
  isRideAccepted?: boolean;
  status?: RideStatus;
  updatedTimestamp: Date;
  fee?: number;
  otp?: number;
  isRideOTPVerified?: boolean;
  pickupLocation?: IPickupAndDropoffLocation;
  dropoffLocation?: IPickupAndDropoffLocation;
  createdAt?: Date;
  updatedAt?: Date;
}
