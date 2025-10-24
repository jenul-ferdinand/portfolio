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
          const r = imageData[offset]
          const g = imageData[offset + 1]
          const b = imageData[offset + 2]

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
