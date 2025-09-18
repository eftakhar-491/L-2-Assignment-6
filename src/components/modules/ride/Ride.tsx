import LocationInput from "./components/LocationInput";
import MapShow from "./components/MapShow";
import { RiderRideDetails } from "./components/modal/RiderRideDetails";

const Ride = () => {
  return (
    <>
      {true && <RiderRideDetails />}
      <section className="flex gap-4 items-start mt-5 max-w-1600px mx-auto px-4">
        <LocationInput />
        <MapShow />
      </section>
    </>
  );
};

export default Ride;
