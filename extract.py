from PIL import Image
import collections
import os

def remove_background(img_path, out_dir):
    img = Image.open(img_path).convert('RGBA')
    pixels = img.load()
    w, h = img.size
    
    # Simple BFS to find all background pixels
    # Start from top-left, top-right, bottom-left, bottom-right and their edges
    queue = collections.deque()
    visited = set()
    
    # Add borders to queue
    for x in range(w):
        queue.append((x, 0))
        queue.append((x, h-1))
        visited.add((x, 0))
        visited.add((x, h-1))
    for y in range(h):
        queue.append((0, y))
        queue.append((w-1, y))
        visited.add((0, y))
        visited.add((w-1, y))
        
    while queue:
        x, y = queue.popleft()
        r, g, b, a = pixels[x, y]
        
        # Check if the pixel is part of the checkerboard (greyish)
        # Background is roughly between 40-120 and has low color saturation
        # The true manga shapes have pure white (255) outlines and pure black.
        # But let's just make it simple: if it's NOT white, and NOT black.
        # Background is grey.
        if 40 <= r <= 150 and 40 <= g <= 150 and 40 <= b <= 150:
            pixels[x, y] = (0, 0, 0, 0)
            
            for nx, ny in ((x+1, y), (x-1, y), (x, y+1), (x, y-1)):
                if 0 <= nx < w and 0 <= ny < h:
                    if (nx, ny) not in visited:
                        visited.add((nx, ny))
                        queue.append((nx, ny))
        else:
            # We hit a boundary (the white outline of the stickers)
            # Actually, because the checkerboard might have aliasing, 
            # we also consider anything that's greyish not white.
            # But just stopping at the white border works perfectly since 
            # Gemini images have thick white outlines!
            # It's a sticker!
            # If it's pure white (or close to it) like > 200, we stop.
            pass

    # Now let's just crop out the components
    # Character: top left
    char_crop = img.crop((40, 40, 950, 1150))
    char_crop.save(os.path.join(out_dir, 'manga_char.png'))

    # Speech Bubble: top right
    bubble_crop = img.crop((900, 150, 1850, 600))
    bubble_crop.save(os.path.join(out_dir, 'manga_bubble.png'))

    # Projects panel: bottom right
    projects_crop = img.crop((1024, 750, 1950, 1950))
    projects_crop.save(os.path.join(out_dir, 'manga_projects.png'))

    # Keyboard alone: bottom left
    kb_crop = img.crop((100, 1250, 950, 1600))
    kb_crop.save(os.path.join(out_dir, 'manga_keyboard.png'))

    # Chibi head: bottom center
    chibi_crop = img.crop((350, 1630, 700, 1950))
    chibi_crop.save(os.path.join(out_dir, 'manga_chibi.png'))

if __name__ == "__main__":
    remove_background('/media/nsroot/Dev/2026_projects/Portfolio/static/images/Gemini_Generated_Image_1z8v7x1z8v7x1z8v.png', 
                     '/media/nsroot/Dev/2026_projects/Portfolio/static/images/')
