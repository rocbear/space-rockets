import useSWR, { useSWRInfinite } from "swr";

const fetcher = async (input: RequestInfo, init?: RequestInit) => {
  const response = await fetch(input, init);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return await response.json();
};

function getSpaceXUrl(path?: string, options?: { [key: string]: any }) {
  const searchParams = new URLSearchParams();
  for (const property in options) {
    searchParams.append(property, options[property]);
  }

  const spaceXApiBase = process.env.REACT_APP_SPACEX_API_URL;
  return `${spaceXApiBase}${path}?${searchParams.toString()}`;
}

export function useSpaceX(path?: string, options?: { [key: string]: any }) {
  const endpointUrl = getSpaceXUrl(path, options);
  return useSWR(path ? endpointUrl : null, fetcher);
}

export function useSpaceXPaginated(
  path: string,
  options: { [key: string]: any }
) {
  return useSWRInfinite((pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) {
      return null;
    }
    return getSpaceXUrl(path, {
      ...options,
      offset: options.limit * pageIndex,
    });
  }, fetcher);
}

export type LaunchPadLocation = {
  name: string;
  region: string;
  latitude: string;
  longitude: string;
};
export type LaunchPad = {
  name: string;
  site_id: string;
  site_name: string;
  site_name_long: string;
  successful_launches: number;
  attempted_launches: number;
  location: LaunchPadLocation;
  vehicles_launched: string[];
  stats: string;
  status: string;
};
export type Launch = {
  flight_number: string;
  mission_name: string;
  launch_success: boolean;
  launch_date_utc: string;
  launch_date_local: string;
  links: {
    flickr_images: string[];
    mission_patch_small: string;
    youtube_id: String;
  };
  rocket: {
    rocket_name: string;
    rocket_type: string;
    first_stage: {
      cores: Array<{
        core_serial: string;
        land_success?: boolean;
      }>;
    };
    second_stage: {
      block: number;
      payloads: Array<{
        payload_type: string;
      }>;
    };
  };
  launch_site: Partial<LaunchPad>;
};
