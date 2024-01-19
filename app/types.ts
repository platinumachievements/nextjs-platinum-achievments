export interface AuthenticationProps {
  setParentData: (data: any) => void; // Replace 'any' with the type of data you're expecting
}

export interface GetUserIdProps {
  setParentData: (data: any) => void; // Replace 'any' with the type of data you're expecting
  data: any; // Replace 'any' with the type of data
}

export interface GetUserTitlesProps {
  setParentData: (data: any) => void; // Replace 'any' with the type of data you're expecting
  data: any;
  userData: any; // Replace 'any' with the type of data
}
