const {StatusCodes}=require('http-status-codes');
const {Booking}=require('../models/booking');
const { AppError,ValidationError} = require('../utils/errors/index');
class BookingRepository{
      //setting crud repository
      async create(data){
        try {
          const booking=await Booking.create(data);
          return booking;
            
        } catch (error) {
            if(error.name=='SequelizeValidationError'){
                throw new ValidationError(error)
            }
            throw new AppError('RepositoryError','Cannot create Booking',
            'Something went wrong due to some issue',StatusCodes.INTERNAL_SERVER_ERROR
            );
            
        }
      }
      async update(bookingId,data){
        try {

          // await Booking.update(data,{
          //   where:{
          //     id:bookingId
          //   }
          // });
         const booking= await Booking.findByPk(bookingId);
          if(data.status){
            booking.status=data.status;
          }
          booking.save();
          return booking;
        } catch (error) {
          throw new AppError('RepositoryError','Cannot update Booking',
            'Something went wrong ',StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
      }




}







module.exports=BookingRepository;