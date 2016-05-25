<?php

/* @Framework/Form/form_rest.html.php */
class __TwigTemplate_9c06c0b3c9b28c55195bd206556643270d4c072d0673ed2986a4146a63e144f1 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_af9642b511879a4658eea3ba78e0bfe4aa0c9dcbd54c9415742f321eeff88560 = $this->env->getExtension("native_profiler");
        $__internal_af9642b511879a4658eea3ba78e0bfe4aa0c9dcbd54c9415742f321eeff88560->enter($__internal_af9642b511879a4658eea3ba78e0bfe4aa0c9dcbd54c9415742f321eeff88560_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/Form/form_rest.html.php"));

        // line 1
        echo "<?php foreach (\$form as \$child): ?>
    <?php if (!\$child->isRendered()): ?>
        <?php echo \$view['form']->row(\$child) ?>
    <?php endif; ?>
<?php endforeach; ?>
";
        
        $__internal_af9642b511879a4658eea3ba78e0bfe4aa0c9dcbd54c9415742f321eeff88560->leave($__internal_af9642b511879a4658eea3ba78e0bfe4aa0c9dcbd54c9415742f321eeff88560_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/Form/form_rest.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <?php foreach ($form as $child): ?>*/
/*     <?php if (!$child->isRendered()): ?>*/
/*         <?php echo $view['form']->row($child) ?>*/
/*     <?php endif; ?>*/
/* <?php endforeach; ?>*/
/* */
