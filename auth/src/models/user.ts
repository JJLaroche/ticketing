import mongoose from "mongoose";
import { Password } from "../services/password";

// An interface describing neccesary properties in orde to create a user

interface UserAttributes {
    email: string;
    password: string;
}

//El modelo nos indica como se comporta la collecion y el doc nos indica los parametros
// propios de un documento

// An interface that describes properties that usermodel has

interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttributes): UserDoc;
}

// An interface that describes the properties that a user document has

interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});

userSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

// para gregar una funcion al modelo ya que de lo contrario no podemos indicarle a ts
//los attr
userSchema.statics.build = (attrs: UserAttributes) => {
    return new User(attrs);
};

//para indicarle a ts que build esta relacionada al modelo
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };