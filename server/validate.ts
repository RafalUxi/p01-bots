// validate handshake data input
export function validateInput(playerId: string, playerName: string): boolean {
  if (typeof playerId !== 'string' || playerId.length > 64 || playerId.length === 0) {
    return false;
  }

  if (typeof playerName !== 'string' || playerName.length === 0 || playerName.length > 16) {
    return false;
  }

  return true;
}
