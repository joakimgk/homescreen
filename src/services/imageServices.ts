import useSWR from "swr";

export const useImage = (url: string) => {
    const { data, error } = useSWR(url, async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch image');
        }
        return response.blob();  // assuming the response is binary (e.g., image)
    });

    return {
        imageBase64: data,
        isLoading: !error && !data,
        isError: error,
    };
};

export default useImage;