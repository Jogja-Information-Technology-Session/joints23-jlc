import { createContext, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { api, setToken } from "../api";

export function RefreshToken(){
  // useState React hook
  const [team, setTeam] = useState("");

  const refreshToken = api.user.refreshToken.useMutation({
    onSuccess: (payload) => {
      if (!payload) return;
      const { accessToken, username } = payload;

      setTeam(username);
      setToken(accessToken);
    },
  });

  // useState React hook
  useEffect(() => { 
    refreshToken.mutate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { team, setTeam };
}

export type TeamContextType = {
  team: string;
  setTeam: Dispatch<SetStateAction<string>>
};

export const TeamContext = createContext<TeamContextType | null>(null);