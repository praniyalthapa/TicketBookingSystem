const { StatusCodes } = require('http-status-codes');

const { BookingService } = require('../services/index');


const bookingService = new BookingService();

class BookingController {

    async create (req, res) {
        try {
            const response = await bookingService.createBooking(req.body);
            console.log("From booking controller",response);
            return res.status(StatusCodes.OK).json({
                message: 'Successfully completed booking',
                success: true,
                err: {},
                data: response
            })
        } catch (error) {
            console.log("from booking controller",error);
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                err: error.explanation,
                data: {}
            });
        }
    }
}

module.exports = BookingController