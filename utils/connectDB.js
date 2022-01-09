import mongoose from 'mongoose';
    
    const db = process.env.MONGODB_URL;
    
    const connectDB = async () => {
      try {
        console.log(db);
        await mongoose.connect(`${db}`, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
      } catch (error) {
        console.log(error.message);
        process.exit(1);
      }
    };
    
    
    export default connectDB;

/*import mongoose from 'mongoose'

const connectDB = () => {
    if(mongoose.connections[0].readyState){
        console.log('Already connected.')
        return;
    }
    mongoose.connect(process.env.MONGODB_URL, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, err => {
        if(err) throw err;
        console.log('Connected to mongodb.')
    })
}

export default connectDB */