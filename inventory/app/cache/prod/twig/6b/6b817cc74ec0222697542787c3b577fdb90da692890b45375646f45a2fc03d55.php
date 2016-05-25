<?php

/* JMSTranslationBundle::base.html.twig */
class __TwigTemplate_d35ec18d5b91ff081e94c366e16df13d939938e78ea909e2e4627b6793d45bb3 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
            'title' => array($this, 'block_title'),
            'topjavascripts' => array($this, 'block_topjavascripts'),
            'body' => array($this, 'block_body'),
            'javascripts' => array($this, 'block_javascripts'),
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_ff2a0259cd929c4523e3a1304b4700b99a3505413394284d2d0a5d5c84fb1a2c = $this->env->getExtension("native_profiler");
        $__internal_ff2a0259cd929c4523e3a1304b4700b99a3505413394284d2d0a5d5c84fb1a2c->enter($__internal_ff2a0259cd929c4523e3a1304b4700b99a3505413394284d2d0a5d5c84fb1a2c_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "JMSTranslationBundle::base.html.twig"));

        // line 1
        echo "<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />
        <title>";
        // line 5
        $this->displayBlock('title', $context, $blocks);
        echo "</title>
        <link rel=\"stylesheet\" type=\"text/css\" media=\"screen\" href=\"";
        // line 6
        echo twig_escape_filter($this->env, $this->env->getExtension('asset')->getAssetUrl("bundles/jmstranslation/css/bootstrap.css"), "html", null, true);
        echo "\" />
        <link rel=\"stylesheet\" type=\"text/css\" media=\"screen\" href=\"";
        // line 7
        echo twig_escape_filter($this->env, $this->env->getExtension('asset')->getAssetUrl("bundles/jmstranslation/css/layout.css"), "html", null, true);
        echo "\" />
        <link rel=\"shortcut icon\" href=\"";
        // line 8
        echo twig_escape_filter($this->env, $this->env->getExtension('asset')->getAssetUrl("favicon.ico"), "html", null, true);
        echo "\" />
        ";
        // line 9
        $this->displayBlock('topjavascripts', $context, $blocks);
        // line 10
        echo "    </head>
    <body>
        <div class=\"topbar\">
            <div class=\"topbar-inner\">
                <div class=\"container\">
                    <h3><a href=\"";
        // line 15
        echo $this->env->getExtension('routing')->getPath("jms_translation_index");
        echo "\" class=\"logo\">JMSTranslationBundle UI</a></h3>
                    
                </div>
            </div>
        </div>
        <div class=\"container\">
            ";
        // line 21
        $this->displayBlock('body', $context, $blocks);
        // line 22
        echo "        </div>

        ";
        // line 24
        $this->displayBlock('javascripts', $context, $blocks);
        // line 27
        echo "    </body>
</html>";
        
        $__internal_ff2a0259cd929c4523e3a1304b4700b99a3505413394284d2d0a5d5c84fb1a2c->leave($__internal_ff2a0259cd929c4523e3a1304b4700b99a3505413394284d2d0a5d5c84fb1a2c_prof);

    }

    // line 5
    public function block_title($context, array $blocks = array())
    {
        $__internal_7ee03c035d278b68f74fa09e368927beca7915606392721b302be2c2a17a5091 = $this->env->getExtension("native_profiler");
        $__internal_7ee03c035d278b68f74fa09e368927beca7915606392721b302be2c2a17a5091->enter($__internal_7ee03c035d278b68f74fa09e368927beca7915606392721b302be2c2a17a5091_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "title"));

        echo "JMSTranslationBundle UI";
        
        $__internal_7ee03c035d278b68f74fa09e368927beca7915606392721b302be2c2a17a5091->leave($__internal_7ee03c035d278b68f74fa09e368927beca7915606392721b302be2c2a17a5091_prof);

    }

    // line 9
    public function block_topjavascripts($context, array $blocks = array())
    {
        $__internal_ff49fab1dc81641621a505dcf6180f0a43d554e9c5304b4382b71e62e89b2650 = $this->env->getExtension("native_profiler");
        $__internal_ff49fab1dc81641621a505dcf6180f0a43d554e9c5304b4382b71e62e89b2650->enter($__internal_ff49fab1dc81641621a505dcf6180f0a43d554e9c5304b4382b71e62e89b2650_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "topjavascripts"));

        
        $__internal_ff49fab1dc81641621a505dcf6180f0a43d554e9c5304b4382b71e62e89b2650->leave($__internal_ff49fab1dc81641621a505dcf6180f0a43d554e9c5304b4382b71e62e89b2650_prof);

    }

    // line 21
    public function block_body($context, array $blocks = array())
    {
        $__internal_7a24144e4222b6769bcacd033f500a936c9f2630bcb124516cc9bca922a5dbe4 = $this->env->getExtension("native_profiler");
        $__internal_7a24144e4222b6769bcacd033f500a936c9f2630bcb124516cc9bca922a5dbe4->enter($__internal_7a24144e4222b6769bcacd033f500a936c9f2630bcb124516cc9bca922a5dbe4_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "body"));

        
        $__internal_7a24144e4222b6769bcacd033f500a936c9f2630bcb124516cc9bca922a5dbe4->leave($__internal_7a24144e4222b6769bcacd033f500a936c9f2630bcb124516cc9bca922a5dbe4_prof);

    }

    // line 24
    public function block_javascripts($context, array $blocks = array())
    {
        $__internal_7252e892bfafbb71804eaa345d6deab508575cb8cc8ac655edd6f4c7aac7c518 = $this->env->getExtension("native_profiler");
        $__internal_7252e892bfafbb71804eaa345d6deab508575cb8cc8ac655edd6f4c7aac7c518->enter($__internal_7252e892bfafbb71804eaa345d6deab508575cb8cc8ac655edd6f4c7aac7c518_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "javascripts"));

        // line 25
        echo "        <script language=\"javascript\" type=\"text/javascript\" src=\"";
        echo twig_escape_filter($this->env, $this->env->getExtension('asset')->getAssetUrl("bundles/jmstranslation/js/jquery.js"), "html", null, true);
        echo "\"></script>
        ";
        
        $__internal_7252e892bfafbb71804eaa345d6deab508575cb8cc8ac655edd6f4c7aac7c518->leave($__internal_7252e892bfafbb71804eaa345d6deab508575cb8cc8ac655edd6f4c7aac7c518_prof);

    }

    public function getTemplateName()
    {
        return "JMSTranslationBundle::base.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  122 => 25,  116 => 24,  105 => 21,  94 => 9,  82 => 5,  74 => 27,  72 => 24,  68 => 22,  66 => 21,  57 => 15,  50 => 10,  48 => 9,  44 => 8,  40 => 7,  36 => 6,  32 => 5,  26 => 1,);
    }
}
/* <!DOCTYPE html>*/
/* <html>*/
/*     <head>*/
/*         <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />*/
/*         <title>{% block title %}JMSTranslationBundle UI{% endblock %}</title>*/
/*         <link rel="stylesheet" type="text/css" media="screen" href="{{ asset("bundles/jmstranslation/css/bootstrap.css") }}" />*/
/*         <link rel="stylesheet" type="text/css" media="screen" href="{{ asset("bundles/jmstranslation/css/layout.css") }}" />*/
/*         <link rel="shortcut icon" href="{{ asset('favicon.ico') }}" />*/
/*         {% block topjavascripts %}{% endblock %}*/
/*     </head>*/
/*     <body>*/
/*         <div class="topbar">*/
/*             <div class="topbar-inner">*/
/*                 <div class="container">*/
/*                     <h3><a href="{{ path("jms_translation_index") }}" class="logo">JMSTranslationBundle UI</a></h3>*/
/*                     */
/*                 </div>*/
/*             </div>*/
/*         </div>*/
/*         <div class="container">*/
/*             {% block body %}{% endblock %}*/
/*         </div>*/
/* */
/*         {% block javascripts %}*/
/*         <script language="javascript" type="text/javascript" src="{{ asset("bundles/jmstranslation/js/jquery.js") }}"></script>*/
/*         {% endblock %}*/
/*     </body>*/
/* </html>*/
