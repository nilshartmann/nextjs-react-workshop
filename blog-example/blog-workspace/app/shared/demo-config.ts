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
 * Eine Id eines Blog Posts setzen (z.B. P1), dann liefert der Request fuer den BlogPost
 * mit der Id eine ungültige Antwort (nur bei Einzel-Post-Darstellung)
 *
 * Achtung: der Server liefert weiterhin HTTP 200 OK zurück,
 * aber das Post-Objekt passt nicht zum geforderten Format (title fehlt)
 */
export const failPostRequestForId = "";

/**
 * Verzögern des Ladens der Kommentare auf der Einzel-Post-Darstellung
 */
export const delayPostComments = 0;

/**
 * Eine Id eines Blog Posts setzen (z.B. P1), dann liefert der Request fuer die Kommentare
 * des Blog Posts mit der Id eine ungültige Antwort (nur bei Einzel-Post-Darstellung)
 *
 * Achtung: der Server liefert weiterhin HTTP 200 OK zurück,
 * aber das Post-Objekt passt nicht zum geforderten Format (comment fehlt)
 */
export const failCommentsPostRequestForId = "";

/**
 * Verzögern beim Speichern eines neuen Blog-Posts
 */
export const delaySavePost = 0;

/**
 * Verzögern des "Likens" eines Blog-Posts
 */
export const delayLikePost = 0;
