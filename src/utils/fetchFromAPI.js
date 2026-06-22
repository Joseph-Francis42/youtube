import axios from 'axios';
import { 
  mockVideosByCategory, 
  mockChannelDetail, 
  mockVideoDetails, 
  getMockRelatedVideos, 
  searchMockVideos, 
  allMockVideos 
} from './mockData';

export const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const options = {
  params: {
    maxResults: '50'
  },
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY || '',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
};

/**
 * Main function to fetch YouTube data.
 * Falls back to local high-fidelity mock data if:
 * 1. The API key is missing.
 * 2. The API request fails (rate limit, network issue, or invalid key).
 */
export const fetchFromAPI = async (url) => {
  const apiKey = import.meta.env.VITE_RAPID_API_KEY;

  if (apiKey && apiKey.trim() !== '') {
    try {
      console.log(`[API] Fetching live data from RapidAPI: ${url}`);
      const { data } = await axios.get(`${BASE_URL}/${url}`, options);
      return data;
    } catch (error) {
      console.warn('[API] RapidAPI fetch failed. Falling back to mock data.', error.message);
      // Fail-safe fall through to mock data
    }
  } else {
    console.log(`[API] No API key detected. Serving mock data for: ${url}`);
  }

  // Resolve mock data based on the request URL
  return resolveMockRequest(url);
};

// Mock request parser to simulate RapidAPI endpoints
const resolveMockRequest = (url) => {
  const parsedUrl = new URL(url, 'https://dummy-base.com');
  const path = parsedUrl.pathname.replace(/^\//, ''); // Get endpoint name
  const params = parsedUrl.searchParams;

  // 1. VIDEOS DETAILED ENDPOINT
  if (path === 'videos') {
    const id = params.get('id');
    const mockDetail = mockVideoDetails[id];
    if (mockDetail) {
      return {
        kind: 'youtube#videoListResponse',
        items: [mockDetail]
      };
    }
    // General fallback video details if requested ID is not in our direct database
    return {
      kind: 'youtube#videoListResponse',
      items: [{
        id: id || 'demo-video-id',
        snippet: {
          title: 'Premium YouTube Developer Video Tutorial',
          channelId: 'UCmXmlB4-HJytD7wek0Uo97A',
          channelTitle: 'JavaScript Mastery',
          description: 'A premium React.js and Material UI developers tutorial. Explore the features and components.'
        },
        statistics: {
          viewCount: '482910',
          likeCount: '38192',
          commentCount: '102'
        }
      }]
    };
  }

  // 2. CHANNELS DETAILED ENDPOINT
  if (path === 'channels') {
    const id = params.get('id');
    const mockChannel = mockChannelDetail[id];
    if (mockChannel) {
      return {
        kind: 'youtube#channelListResponse',
        items: [mockChannel]
      };
    }
    // Fallback channel info
    return {
      kind: 'youtube#channelListResponse',
      items: [{
        id: id || 'demo-channel-id',
        snippet: {
          title: 'Development Channel',
          description: 'Educational programming content, tech reviews, and full stack developer courses.',
          thumbnails: { high: { url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe' } }
        },
        statistics: {
          subscriberCount: '450000',
          viewCount: '23000000',
          videoCount: '150'
        },
        brandingSettings: {
          image: {
            bannerExternalUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe'
          }
        }
      }]
    };
  }

  // 3. SEARCH ENDPOINT (Feed list, search queries, related videos)
  if (path === 'search') {
    const relatedToVideoId = params.get('relatedToVideoId');
    const query = params.get('q');
    
    // Related videos
    if (relatedToVideoId) {
      return {
        kind: 'youtube#searchListResponse',
        items: getMockRelatedVideos(relatedToVideoId)
      };
    }

    // Category / Query videos
    if (query) {
      // If it matches a category exactly (like 'Coding', 'Music')
      if (mockVideosByCategory[query]) {
        return {
          kind: 'youtube#searchListResponse',
          items: mockVideosByCategory[query]
        };
      }
      
      // Match query words
      return {
        kind: 'youtube#searchListResponse',
        items: searchMockVideos(query)
      };
    }

    // Generic fallback for list
    return {
      kind: 'youtube#searchListResponse',
      items: allMockVideos
    };
  }

  // Default empty list
  return {
    kind: 'youtube#searchListResponse',
    items: []
  };
};
