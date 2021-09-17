export const badgeAnimation = `
  @keyframes faceitEnhancerBadge {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
  };
`

export default {
  0: {
    bgColor: '#878787',
    textColor: '#fff'
  },
  1: {
    bgColor:
      'linear-gradient(90deg, rgba(16,77,108,1) 0%, rgba(0,156,193,1) 100%)',
    textColor: '#fff'
  },
  2: {
    bgColor:
      'linear-gradient(90deg, rgba(16,108,53,1) 0%, rgba(0,193,58,1) 100%)',
    textColor: '#fff'
  },
  3: {
    bgColor:
      'linear-gradient(90deg, rgba(134,114,22,1) 0%, rgba(230,193,0,1) 100%)',
    textColor: '#fff'
  },
  4: {
    bgColor:
      'linear-gradient(90deg, rgba(108,25,16,1) 0%, rgba(193,25,0,1) 100%)',
    textColor: '#fff'
  },
  5: {
    bgColor:
      'linear-gradient(-45deg, #ffffa9 0%, #ffd078 16.6%, #ff9c5e 33.2%, #fb635f 49.8%, #e21c72 66.4%, #b0008c 83%, #5300a6 100%)',
    textColor: '#fff',
    style: {
      backgroundSize: '125% 125%',
      animation: 'faceitEnhancerBadge 6s ease-in-out infinite'
    }
  }
}
