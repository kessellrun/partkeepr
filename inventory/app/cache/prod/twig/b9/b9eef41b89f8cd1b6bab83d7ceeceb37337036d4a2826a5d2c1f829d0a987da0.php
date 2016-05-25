<?php

/* ::base.html.twig */
class __TwigTemplate_ee7c2af8558dd3b2fdc2dd904df9aa7eb7988fd8670167fb7678244ca7290665 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
            'title' => array($this, 'block_title'),
            'stylesheets' => array($this, 'block_stylesheets'),
            'body' => array($this, 'block_body'),
            'javascripts' => array($this, 'block_javascripts'),
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_435e682a3e02f1b0145694e4dd9c64ea1b9afd7fd89c4e89520f4c767cd7aef2 = $this->env->getExtension("native_profiler");
        $__internal_435e682a3e02f1b0145694e4dd9c64ea1b9afd7fd89c4e89520f4c767cd7aef2->enter($__internal_435e682a3e02f1b0145694e4dd9c64ea1b9afd7fd89c4e89520f4c767cd7aef2_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "::base.html.twig"));

        // line 1
        echo "<!DOCTYPE html>
<html>
    <head>
        <meta charset=\"UTF-8\" />
        <title>";
        // line 5
        $this->displayBlock('title', $context, $blocks);
        echo "</title>
        ";
        // line 6
        $this->displayBlock('stylesheets', $context, $blocks);
        // line 7
        echo "        <link rel=\"icon\" type=\"image/x-icon\" href=\"";
        echo twig_escape_filter($this->env, $this->env->getExtension('asset')->getAssetUrl("favicon.ico"), "html", null, true);
        echo "\" />
    </head>
    <body>
        ";
        // line 10
        $this->displayBlock('body', $context, $blocks);
        // line 11
        echo "        ";
        $this->displayBlock('javascripts', $context, $blocks);
        // line 12
        echo "    </body>
</html>
";
        
        $__internal_435e682a3e02f1b0145694e4dd9c64ea1b9afd7fd89c4e89520f4c767cd7aef2->leave($__internal_435e682a3e02f1b0145694e4dd9c64ea1b9afd7fd89c4e89520f4c767cd7aef2_prof);

    }

    // line 5
    public function block_title($context, array $blocks = array())
    {
        $__internal_9dd47d097b20f990d941bc3dd37ddacb0b665d7646f869f50f1c54b21b277aae = $this->env->getExtension("native_profiler");
        $__internal_9dd47d097b20f990d941bc3dd37ddacb0b665d7646f869f50f1c54b21b277aae->enter($__internal_9dd47d097b20f990d941bc3dd37ddacb0b665d7646f869f50f1c54b21b277aae_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "title"));

        echo "Welcome!";
        
        $__internal_9dd47d097b20f990d941bc3dd37ddacb0b665d7646f869f50f1c54b21b277aae->leave($__internal_9dd47d097b20f990d941bc3dd37ddacb0b665d7646f869f50f1c54b21b277aae_prof);

    }

    // line 6
    public function block_stylesheets($context, array $blocks = array())
    {
        $__internal_6d5266913dc3ffa6c3b55fc8450314c708dddd7a2f30947cdf73faf969084a37 = $this->env->getExtension("native_profiler");
        $__internal_6d5266913dc3ffa6c3b55fc8450314c708dddd7a2f30947cdf73faf969084a37->enter($__internal_6d5266913dc3ffa6c3b55fc8450314c708dddd7a2f30947cdf73faf969084a37_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "stylesheets"));

        
        $__internal_6d5266913dc3ffa6c3b55fc8450314c708dddd7a2f30947cdf73faf969084a37->leave($__internal_6d5266913dc3ffa6c3b55fc8450314c708dddd7a2f30947cdf73faf969084a37_prof);

    }

    // line 10
    public function block_body($context, array $blocks = array())
    {
        $__internal_f675183e05458d1f8e24075fbb9cbddcc437e3e31b3d16371f6e7afcca60fc54 = $this->env->getExtension("native_profiler");
        $__internal_f675183e05458d1f8e24075fbb9cbddcc437e3e31b3d16371f6e7afcca60fc54->enter($__internal_f675183e05458d1f8e24075fbb9cbddcc437e3e31b3d16371f6e7afcca60fc54_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "body"));

        
        $__internal_f675183e05458d1f8e24075fbb9cbddcc437e3e31b3d16371f6e7afcca60fc54->leave($__internal_f675183e05458d1f8e24075fbb9cbddcc437e3e31b3d16371f6e7afcca60fc54_prof);

    }

    // line 11
    public function block_javascripts($context, array $blocks = array())
    {
        $__internal_d2f7f6a0607718dbb2a9570fbf6997df11aa52eed129132f633a10a72fd2e5c6 = $this->env->getExtension("native_profiler");
        $__internal_d2f7f6a0607718dbb2a9570fbf6997df11aa52eed129132f633a10a72fd2e5c6->enter($__internal_d2f7f6a0607718dbb2a9570fbf6997df11aa52eed129132f633a10a72fd2e5c6_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "javascripts"));

        
        $__internal_d2f7f6a0607718dbb2a9570fbf6997df11aa52eed129132f633a10a72fd2e5c6->leave($__internal_d2f7f6a0607718dbb2a9570fbf6997df11aa52eed129132f633a10a72fd2e5c6_prof);

    }

    public function getTemplateName()
    {
        return "::base.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  93 => 11,  82 => 10,  71 => 6,  59 => 5,  50 => 12,  47 => 11,  45 => 10,  38 => 7,  36 => 6,  32 => 5,  26 => 1,);
    }
}
/* <!DOCTYPE html>*/
/* <html>*/
/*     <head>*/
/*         <meta charset="UTF-8" />*/
/*         <title>{% block title %}Welcome!{% endblock %}</title>*/
/*         {% block stylesheets %}{% endblock %}*/
/*         <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}" />*/
/*     </head>*/
/*     <body>*/
/*         {% block body %}{% endblock %}*/
/*         {% block javascripts %}{% endblock %}*/
/*     </body>*/
/* </html>*/
/* */
