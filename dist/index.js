"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo = require("mongodb");
const stream_1 = require("stream");
exports.mwriter = (opts) => {
    let connection;
    let batch = [];
    let c = 0;
    const verbose = opts.verbose;
    const writable = new stream_1.Writable({
        objectMode: true,
        write: (chunk, enc, cb) => __awaiter(this, void 0, void 0, function* () {
            try {
                batch.push(JSON.parse(chunk.toString()));
                if (verbose && ++c % 500 === 0)
                    process.stdout.write(c.toString());
                if (batch.length % opts.batchSize === 0) {
                    if (!connection)
                        connection = yield mongo.connect(opts.dbString);
                    yield connection.collection(opts.collection).insertMany(batch);
                    if (verbose)
                        process.stdout.write('.');
                    batch.length = 0;
                }
                cb();
            }
            catch (err) {
                console.error(err);
                connection.close();
            }
        })
    });
    writable.on('pipe', () => { console.log('Starting Mongo stream'); });
    writable.on('finish', () => {
        // Insert remaining of the batch
        connection.collection(opts.collection).insertMany(batch);
        console.log('Done');
        connection.close();
    });
    return writable;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGlDQUFnQztBQUNoQyxtQ0FBaUM7QUFVcEIsUUFBQSxPQUFPLEdBQUcsQ0FBQyxJQUE4QjtJQUNwRCxJQUFJLFVBQW9CLENBQUE7SUFDeEIsSUFBSSxLQUFLLEdBQWtCLEVBQUUsQ0FBQTtJQUM3QixJQUFJLENBQUMsR0FBVyxDQUFDLENBQUE7SUFDakIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUU1QixNQUFNLFFBQVEsR0FBRyxJQUFJLGlCQUFRLENBQUM7UUFDNUIsVUFBVSxFQUFFLElBQUk7UUFDaEIsS0FBSyxFQUFFLENBQU8sS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQzFCLElBQUksQ0FBQztnQkFDSCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQTtnQkFDeEMsRUFBRSxDQUFBLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUM7b0JBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7Z0JBQ2pFLEVBQUUsQ0FBQSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsS0FBSyxDQUFDLENBQUMsQ0FBQSxDQUFDO29CQUN0QyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQzt3QkFBQyxVQUFVLEdBQUcsTUFBTSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtvQkFDaEUsTUFBTSxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUE7b0JBQzlELEVBQUUsQ0FBQSxDQUFDLE9BQU8sQ0FBQzt3QkFBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtvQkFDckMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7Z0JBQ2xCLENBQUM7Z0JBQ0QsRUFBRSxFQUFFLENBQUE7WUFDTixDQUFDO1lBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDYixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUNsQixVQUFVLENBQUMsS0FBSyxFQUFFLENBQUE7WUFDcEIsQ0FBQztRQUNILENBQUMsQ0FBQTtLQUNGLENBQUMsQ0FBQTtJQUVGLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFFBQVEsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDbkUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUU7UUFDcEIsZ0NBQWdDO1FBQ2hDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN4RCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNwQixDQUFDLENBQUMsQ0FBQTtJQUNGLE1BQU0sQ0FBQyxRQUFRLENBQUE7QUFDakIsQ0FBQyxDQUFBIn0=