export enum Position {
  HOST = 'host', // 방장
  GUEST = 'guest', // 참여한 사람
}

export enum Point {
  ATTEND = 10, // 출석
  WEIGHT = 20, // 체중
  FAT = 40, // 체지방율
  MUSCLE = 60, // 골격근량
}

export type Invitiation = {
  userId: number;
  invitedUserId: number;
  challengeId: number;
  message: string;
};
