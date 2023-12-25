//first we fetch flight detail from flightId using http request and from that we get price already
const {BookingRepository}=require('../repository/index');
const axios=require('axios');
const {FLIGHT_SERVICE_PATH}=require('../config/serverConfig');
const { ServiceError } = require('../utils/errors');
class BookingService{
    constructor(){
  this.BookingRepository=new BookingRepository();
    }
async createBooking(data){ 
try {
    const flightId=data.flightId;//there will be 3 parameter flightId,userId,NumberOfSeats
    //to get flightId we need to fetch data from flightSearchService so we need to call http request
//to do http request we use package name axios (npm i axios)
   let getFlightURL=`${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;//flightId is from data parameter which comes from the controller
  const response=await axios.get(getFlightURL);
  const flightData=response.data.data; //this is actual flight data
  let priceOfTheFlight=flightData.price;
 if(data.noOfSeats > flightData.totalSeats){
  throw new ServiceError('Something went wrong in your booking process','Sorry! There is insufficient seats');
 }
const  totalCost=priceOfTheFlight * data.noOfSeats;
const bookingPayload={...data,totalCost};
const booking=await this.BookingRepository.create(bookingPayload); //booking is done here
console.log("Booking",booking);
const updateFlightRequestUrl=`${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`; //this new url is for update then we patch using axios=>axios patch
 await axios.patch(updateFlightRequestUrl,{totalSeats:flightData.totalCost-booking.totalSeats});
const finalBooking=await this.BookingRepository.update(booking.id,{status:"Booked"});
return finalBooking;
 // console.log("From Booking service",flight.data.data);
 // return flight.data.data;
} catch (error) {
  console.log(error);
  if(error.name=='RepositoryError' || error.name=='ValidationError'){
    throw error;
  }
    throw new ServiceError();
}

}


}
module.exports=BookingService;