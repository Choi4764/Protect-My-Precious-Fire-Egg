import { config } from "../../config/config.js";
import { CLIENT_VERSION } from "../../constants/env.js";
import { GamePacket } from "../../init/loadProtos.js";

const createHeader = (payloadLength, packetType, sequence) => {
    const { PACKET_TYPE_SIZE, VERSION_LENGTH_SIZE, SEQUENCE_SIZE, PAYLOAD_LENGTH_SIZE } =
      config.header;
  
    const packetTypeBuffer = Buffer.alloc(PACKET_TYPE_SIZE);
    packetTypeBuffer.writeUInt16BE(packetType, 0);
  
    const versionBuffer = Buffer.from(CLIENT_VERSION);
  
    const versionLengthBuffer = Buffer.alloc(VERSION_LENGTH_SIZE);
    versionLengthBuffer.writeUInt8(versionBuffer.length, 0);
  
    const sequenceBuffer = Buffer.alloc(SEQUENCE_SIZE);
    sequenceBuffer.writeUInt32BE(sequence, 0);
  
    const payloadLengthBuffer = Buffer.alloc(PAYLOAD_LENGTH_SIZE);
    payloadLengthBuffer.writeUInt32BE(payloadLength, 0);
  
    return Buffer.concat([
      packetTypeBuffer,
      versionLengthBuffer,
      versionBuffer,
      sequenceBuffer,
      payloadLengthBuffer,
    ]);
  };

export const createResponse = (payload, packetType, sequence) => {
  const payloadBuffer = GamePacket.encode(GamePacket.create(payload)).finish();

  const header = createHeader(
    payloadBuffer.length,
    packetType,
    sequence
  );

  return Buffer.concat([header, payloadBuffer]);
};