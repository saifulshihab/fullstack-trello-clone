import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const connection = await mongoose.connect(`${process.env.MONGO_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log(`MongoDB connected to ${connection.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
