export class TokenResponseDTO {
  token: string;
  type: string;

constructor(token: string, type: string = "Bearer") {
    this.token = token;
    this.type = type;
  }
}
