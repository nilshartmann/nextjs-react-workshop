// ==============================================================================
//
// == Nur zu Demozwecken: Kuenstliches Verlangsamen der Server-Requests
//
// ==============================================================================

/**
 * Verzögern der Post-Liste (/posts)
 */
export const delayPostList = 0;

/**
 * Verzögern der Einzel-Post-Darstellung (/post/postId)
 */
export const delayPostPage = 0;

/**
 * Eine Id (z.B. P1) setzen, dann liefert der Request fuer den BlogPost
 * eine ungültige Antwort (nur bei Einzel-Post-Darstellung)
 */

export const failPostRequest = "P1";

/**
 * Verzögern des Ladens der Kommentare auf der Einzel-Post-Darstellung
 */
export const delayPostComments = 0;

/**
 * Verzögern beim Speichern eines neuen Blog-Posts
 */
export const delaySavePost = 0;
