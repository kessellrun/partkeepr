<?php

namespace PartKeepr\CoreBundle;

class PartKeeprVersion
{
    /**
     * Holds the PartKeepr Version.
     *
     * If 1.0.0, then the function will return 'GIT Development Version'.
     * 1.0.0 will be replaced by the build script with the actual version.
     *
     * The reason why we have a separate class for the version constant is that
     * we can easily replace it from scripts.
     */
    const PARTKEEPR_VERSION = '1.0.0';
}
