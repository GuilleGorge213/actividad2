import mongoose from "mongoose";

const Schema = mongoose.Schema;

const flightsSchema = new Schema({
  origen: { type: String, required: true },
  destino: { type: String, required: true }, // He eliminado 'unique: true' si no es necesario
  fecha: { type: Date, required: true },
});

// Si tienes un tipo definido en types.ts, puedes usarlo aquí
export type FlightModelType = mongoose.Document; // Si no tienes un tipo 'Flight', puedes omitir la definición de 'Omit'

export const FlightModel = mongoose.model<FlightModelType>(
  "Flight",
  flightsSchema
);
