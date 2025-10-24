/**
 * Calculate the relative luminance of an RGB color
 * @param {number} r - Red value (0-255)
 * @param {number} g - Green value (0-255)
 * @param {number} b - Blue value (0-255)
 * @returns {number} Luminance value (0-1)
 */
function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r / 255, g / 255, b / 255]
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

/**
 * Check if a color is grayscale (r ≈ g ≈ b)
 * @param {number} r - Red value (0-255)
 * @param {number} g - Green value (0-255)
 * @param {number} b - Blue value (0-255)
 * @returns {boolean} True if color is grayscale
 */
function isGrayscale(r, g, b) {
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  // If difference between max and min is less than 20, consider it grayscale
  return (max - min) < 20
}

/**
 * Extracts dominant colors from an image URL
 * @param {string} imageUrl - URL of the image to analyze
 * @param {number} colorCount - Number of colors to extract (default: 3)
 * @returns {Promise<string[]>} Array of hex color strings
 */
export async function extractImageColors(imageUrl, colorCount = 3) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous'

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        // Resize to small size for faster processing
        canvas.width = 50
        canvas.height = 50

        ctx.drawImage(img, 0, 0, 50, 50)
        const imageData = ctx.getImageData(0, 0, 50, 50).data

        // Sample colors from different regions
        const colors = []
        const step = Math.floor(imageData.length / (colorCount * 4))

        for (let i = 0; i < colorCount; i++) {
          const offset = i * step * 4
          let r = imageData[offset]
          let g = imageData[offset + 1]
          let b = imageData[offset + 2]

          const luminance = getLuminance(r, g, b)

          // Only replace if it's dark AND grayscale (true black/dark gray)
          if (luminance < 0.2 && isGrayscale(r, g, b)) {
            // Replace with a lighter gray (#9ca3af - gray-400)
            r = 156
            g = 163
            b = 175
          }

          // Convert to hex
          const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
          colors.push(hex)
        }

        resolve(colors)
      } catch (error) {
        reject(error)
      }
    }

    img.onerror = () => {
      reject(new Error('Failed to load image'))
    }

    img.src = imageUrl
  })
}
